import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Controller, Post, Route, Body, Header, Tags } from 'tsoa';
import { User } from '@prisma/client';
import InvalidParametersError from '../lib/invalidParameters';
import { createUser, updateUser, deleteUser } from '../dao/users';

@Route('webhooks')
@Tags('webhooks')
export class WebhookController extends Controller {
  @Post('/clerk')
  public async clerkUsers(
    @Body() payload: unknown,
    @Header('svix-id') svixId: string,
    @Header('svix-timestamp') svixTimestamp: string,
    @Header('svix-signature') svixSignature: string,
  ): Promise<void> {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Missing Clerk webhook secret');
    }

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new InvalidParametersError('Missing svix headers');
    }

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;
    try {
      evt = wh.verify(JSON.stringify(payload), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      throw new Error('Invalid webhook signature for user event');
    }

    if (evt.type === 'user.created') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      if (!id || !email_addresses) {
        throw new InvalidParametersError('Missing user parameters');
      }

      const user = {
        clerkUserId: id,
        email: email_addresses[0].email_address,
        ...(first_name ? { firstName: first_name } : {}),
        ...(last_name ? { lastName: last_name } : {}),
        ...(image_url ? { imageUrl: image_url } : {}),
      };
      await createUser(user as User);
    } else if (evt.type === 'user.updated') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      if (!id || !email_addresses) {
        throw new InvalidParametersError('Missing user parameters');
      }

      const user = {
        clerkUserId: id,
        email: email_addresses[0].email_address,
        ...(first_name ? { firstName: first_name } : {}),
        ...(last_name ? { lastName: last_name } : {}),
        ...(image_url ? { imageUrl: image_url } : {}),
      };
      await updateUser(id, user as User);
    } else if (evt.type === 'user.deleted') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id } = evt.data;
      if (!id) {
        throw new InvalidParametersError('Missing user parameters');
      }

      await deleteUser(id);
    } else {
      throw new Error('Invalid Clerk webhook event type');
    }
  }
}

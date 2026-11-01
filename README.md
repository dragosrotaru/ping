# Ping

**Website visitors text a business; the business replies from its own phone.**

Ping is a SaaS product made of three pieces:
- an embeddable contact widget that any website can add with one script tag
- an SMS relay that connects each visitor to the business through Twilio
- an admin dashboard where businesses manage widgets, contacts, conversations, billing and analytics

client.ping.buzz: [![Netlify Status](https://api.netlify.com/api/v1/badges/317ab9aa-d5ea-4def-a4f7-a40452a0cbf6/deploy-status)](https://app.netlify.com/sites/ping-client/deploys)
admin.ping.buzz: [![Netlify Status](https://api.netlify.com/api/v1/badges/12980c82-4e75-4e7b-9b9d-f3990750d2a6/deploy-status)](https://app.netlify.com/sites/ping-admin/deploys)

## How it works

1. A business signs up, creates a widget in the dashboard and pastes the snippet into its site.
2. A visitor opens the widget, leaves a name and phone number, and writes a message.
3. Ping texts the message to the business from a Twilio number **paired** with that visitor. When the business replies to that number, the reply is routed back to the visitor's phone. Each side sees an ordinary text thread and neither has to install anything.
4. Every message is stored as a conversation in the dashboard, alongside widget analytics and Stripe billing.

## Highlights

- **Number-pairing SMS relay.** Each (business, visitor) pair is assigned a proxy number, so replies can be routed without exposing either side's real number ([`packages/core/src/sms`](packages/core/src/sms), [`packages/core/src/messaging/router`](packages/core/src/messaging/router)).
- **Functional, typed domain core.** Every domain value (phone numbers with country, verified email addresses, person names, URLs, UUIDs, ...) is an `io-ts` codec, and every use case returns an `fp-ts` `Either` of typed errors instead of throwing ([`packages/core/src/values`](packages/core/src/values)).
- **Ports and adapters.** The core depends only on interfaces ([`packages/core/src/interfaces`](packages/core/src/interfaces)). Twilio, Stripe, SendGrid, Firestore, HTTP and WebSocket adapters plug in at the edge ([`packages/api/src/adapters`](packages/api/src/adapters)).
- **Framework-free embeddable widget.** Plain DOM and CSS with no UI framework, so it loads fast on any host site, plus a small SDK for configuring it ([`packages/client/src`](packages/client/src)).
- **Complete SaaS loop:**
  - passwordless magic-link login ([`packages/core/src/iam`](packages/core/src/iam))
  - Stripe subscriptions with a self-serve billing portal ([`packages/core/src/billing`](packages/core/src/billing))
  - widget analytics, and a React dashboard covering all of it ([`packages/admin`](packages/admin))
- **Email quality checks.** Sign-ups are screened against lists of disposable and free-mail domains ([`packages/core/src/values/email-address`](packages/core/src/values/email-address)).

## Packages

| Package | What it is |
|---|---|
| [`core`](packages/core) | Domain model and use cases: accounts, authentication, widgets, contacts, conversations, SMS, billing, analytics |
| [`api`](packages/api) | Node.js server wiring the core to Twilio, Stripe, SendGrid, Firestore, HTTP and WebSockets |
| [`client`](packages/client) | Embeddable widget and SDK served from client.ping.buzz |
| [`admin`](packages/admin) | React dashboard served from admin.ping.buzz |

## Stack

TypeScript (Node.js and React) in a Lerna monorepo; fp-ts and io-ts; Google Cloud Datastore/Firestore and Redis; Twilio, Stripe and SendGrid; Netlify for the client and admin, and a Google Cloud VM for the API.

## Setup

- Install Node.js, npm and Redis.
- Run `npm run bootstrap` in the project root.
- Add `.env` files in `packages/api`, `packages/client` and `packages/admin` as described in each package's README.

## Run

- Start Redis.
- Run `npm start` in the project root, or inside a single package.

## Deployment

- `api`: deployed manually to the Google Cloud VM.
- `client` and `admin`: deployed automatically by Netlify on every push to `master`.

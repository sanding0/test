# Middle Level - Online Test

Fork the project at first. You should share the url for me once you completed.

## Background

We integrate with Native API via `/lib/native-bridge.ts`.

```
      ┌─────────┐
      │ web app │
      └─┬─────▲─┘
        │     │
        │     │
   ┌────▼─────┴───────┐
   │  Native Bridge   │
   └─┬────▲──────┬──▲─┘
     │    │      │  │
     │    │      │  │
┌────▼────┴┐  ┌──▼──┼───┐
│   iOS    │  │ Android │
└──────────┘  └─────────┘
```

## User Acceptance Criterias

You should implement a `pages/redirect-page.tsx` to meet following UACs.

- _Do redirect when I click the button_

  - **Given** a JSON string in TextArea as `params`
  - **When** I click "Do redirect button"
  - **Then** I should be able to go to the redirect page with query string. something likes `/redirect?params=<params>`

- _Process the `go:sports` target without actions_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the params is `{"target": "go:sports"}`
  - **Then** I should go to `/sports` page

- _Process the `go:sports` target with native actions_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the params is `{"target": "go:sports", "before": [{"action": "call-native", "args": ["CLOSE_DIALOG"]}]}`
  - **Then** I should execute the before-commands by calling `callNativeMethod('CLOSE_DIALOG', {target: '/sports'})`
  - **Then** I should go to `/sports` page

- _Process the `go:promotions` target with native actions_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the params is `{"target": "go:promotions", "before": [{"action": "call-native", "args": ["CLOSE_DIALOG"]}]}`
  - **Then** I should execute the before-commands by calling `callNativeMethod('CLOSE_DIALOG', {target: '/promotions'})`
  - **Then** I should go to `/promotions` page

- _Process the open live-chat modal_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the params is `{"target": "open:live-chat", "before": [{"action": "call-native", "args": ["CLOSE_DIALOG"]}]}`
  - **Then** I should execute the before-commands by calling `callNativeMethod('CLOSE_DIALOG', {target: '#live-chat'})`
  - **Then** I should go to home page with a hash value `#live-chat`

- _Process the open vendor url on native side_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the params is `{"target": "open:vendor", "before": [{"action": "call-native", "args": ["OPEN_VENDOR", {"url": "https://google.com"}]}]}`
  - **Then** I should execute the before-commands by calling `callNativeMethod('OPEN_VENDOR', {url: 'https://google.com'})`

- _Process the unsupported target_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** the target is unsupported
  - **Then** I should go to the home page

- _Process the invalid params_

  - **Given** a route path which is `/redirect?params=<params>`
  - **When** it's unable to extract the prams correctly
  - **Then** I should go to the home page

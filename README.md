# MChain - Memory Chain

Non-custodial password manager

## Features

- Stores passwords encrypted, locally in your browser (window.localStorage)
- Uses AES with initialization vector for better encryption
- Does not send passwords or encryption key anywhere
- Does not gather any statistics, metrics
- Open source - MIT License
- Uses third party libraries as npm deps, check their licenses manually: react, react-router, crypto-js
- You can export all passwords as encrypted backup and import then to another device
- UI is optimized for phones, tablets and desktops

## Live demo

<https://mchain.marsgpl.com>

## Development

```bash
cd ~/projects
git clone git@github.com:marsgpl/mchain.git
cd mchain
nvm use
npm ci
npm start
```

## Production build

```bash
npm run build
```

## Security risks of passwords leaks

Trojans. They send specific data chunks to 3rd party servers. Like whole localStorage. Like your iOS keychain contents.

- It is a risk to keep your encryption key in a keychain of a Device that could have possibly been infected.

Keyloggers. They send everything you type to 3rd party servers via TCP, UDP, ICMP. They know how to bypass your firewall.

- Your browser might have a keylogger extension installed
- Your browser might have a built-in keylogger
- Your Device might have a keylogger installed as a service (virtual keyboard, accessibility tools or just an invisible process)
- Your Device's OS might have a built-in keylogger
- Third party npm libraries might have a keylogger in js or css (very low chance to find it in the deps list of big trusted libraries, but you never know).

## TODO

- custom fields with option to mask value
- username suggestions based on previous passwords
- on page leave: check unsaved changes and confirm exit
- standard confirm/alert/prompt -> custom modal
- need header menu?
  - settings page
  - way to forget key (logout)
  - export/import/erase options accessible from passwords page

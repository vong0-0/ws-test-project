# Module C - Heritage Travel Site

## Competitor information

- Name: Vongsouvan Chanthasone
- Nationality: Laos
- Seat Number: 01

## About this module

In this module, a competitor will create a web page to promote Lyon to tourists.

### Deployment

The web site is reachable at:

```base
http://ws01.worldskills.org/01_module_f/
```

## For Aiy Ket

> **Note:**  
> When building, don't forget to uncomment the `base` option in `vite.config.js`.

### Checklist for Scoring

**F1: Resonsive loading**

- Module is reachable as described
- The web page loads the provided low-resolution image file when the screen width is less than 760px (screen size checker code implemented in `src/App.jsx`)
- The large resolution images are used when screen is at least 760px width(screen size checker code implemented in `src/App.jsx`)
- When the device is offline, there is a minimal webpage that shows the header and "essential information" (service worker code implemented in `public/service-worker.js` and service worker registration implemented in `src/main.jsx`).

  > **Offline Functionality Limitation:**  
  > The offline page works correctly when tested **locally using `npm run dev` or after build using `vite preview`**. However, after deploying to the **VM server**, the offline functionality does not work as expected due to **server configuration limitations**, you will see error `Service worker isn't supported in this browser.` in console.

  > **Note:**  
  > Service workers are only available in secure contexts. This means that their document must be served over **HTTPS**, although browsers also treat [http://localhost](http://localhost) as a secure context to facilitate local development. _[Source: MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#service_worker_concepts_and_usage)_

**F2: Video playback**

- There is a button in the essential information area to play the address information text to speech in French (I created the `ReadOutLoudButton` button in `src/components/Buttons.jsx`)
- When the video is scrolled into view, the video playback starts / resumes (The code implemented in `src/components/sections/Video.jsx`)
- When the video is not in view, the video playback pauses (The code implemented in `src/components/sections/Video.jsx`)
- When the web page is not visible, the video playback pauses (The code implemented in `src/components/sections/Video.jsx`)
- When the web page is visible again, the video playback resumes (The code implemented in `src/components/sections/Video.jsx`)

**F3: Design and Layout Implementation**

- The header layout is implemented (The code implemented in `src/App.jsx`)
- The call to action big section layout is implemented (`src/components/sections/CallToAction.jsx`)
- The map attraction layout is implemented (`src/components/sections/MapAttraction.jsx`)
- The video playback layout is implemented(`src/components/sections/Video.jsx`)
- The essential information layout is implemented (`src/components/sections/EssentialInforAndLatestEvents.jsx`)
- The latest events layout is implemented (`src/components/sections/EssentialInforAndLatestEvents.jsx`)
- The tabs layout is implemented (`src/components/sections/OtherInformation.jsx`)
- The contact layout is implemented (`src/components/sections/ContactUs.jsx`)
- The footer layout is implemented (`src/components/sections/Footer.jsx`)

**F4: Effects**

- The call-to-actions has the defined effect (I created the `CallToActionButton` button in `src/components/Buttons.jsx`)
- The header navigation has blurring glass effect (`src/components/Navigation.jsx`)
- The attraction is focused when hovering on the spot on the map(`src/components/MapAttraction.jsx`)
- The attraction card has the subtle lighting gradient effect as described on mouse hover(`src/components/MapAttraction.jsx`)

**F5: Accessibility**

- Fields in contact form is in logical order
- All text content is readable by screen reader
- image alternatives text has proper applied

**F6 Tabs**

- The tabs custom elements are created (`src/components/Tab.jsx`)
- The tabs work by mouse clicking (`src/components/sections/OtherInformation.jsx`)
- The tabs work by keyboard left and right when focused (`src/components/sections/OtherInformation.jsx`)
- The tabs work by keyboard left and right when focused (`src/components/Tab.jsx`)

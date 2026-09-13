# Media sources and licences

Project and promotional media recorded on 2026-09-13.

## 3A Jewellery project capture

- Local image: `assets/projects/3a-jewellery.webp`
- Source page: [3A Jewellery](https://3ajewellery.com/)
- Capture method: opened the public homepage, dismissed the promotional dialog through its normal `Pencereyi kapat` control, and captured the unobstructed page
- Local edit: cropped and resized to 960×600 WebP for the same aspect ratio as the other project cards
- Local size: 25,524 bytes
- Presentation: a real page capture used only to identify and link to the confirmed portfolio project; it is not presented as a performance claim or proof of responsibility for individual features

## Promotional video licence

Both source pages identify the selected files as available under the **Mixkit Stock Video Free License** for commercial or personal use. The files were downloaded from the asset URLs published in each page's `VideoObject` metadata; no preview, watermark, access control, or temporary hotlink is used by the site.

Licence: [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree)

The licence does not require attribution. The source and contributor are nevertheless recorded here for provenance. The clips appear on the landing page as illustrative promotional footage and are not represented as client work or recordings of delivered projects.

## Web interface clip

- Local video: `assets/videos/web-interface.mp4`
- Local poster: `assets/videos/web-interface-poster.webp`
- Source item: [Software developer working on code, screen close up](https://mixkit.co/free-stock-video/software-developer-working-on-code-screen-close-up-1728/)
- Contributor shown by source page: Mixkit
- Source asset: `https://assets.mixkit.co/videos/1728/1728-720.mp4`
- Source page facts at retrieval: 18 seconds, 24 fps, 4.97 MB, Mixkit Stock Video Free License
- Local edit: 10-second excerpt starting at 00:01, resized to 960×540, H.264 MP4, 24 fps, audio removed, fast-start metadata enabled
- Local sizes: video 252,567 bytes; poster 17,984 bytes
- Attribution requirement: none

## Mobile development clip

- Local video: `assets/videos/mobile-development.mp4`
- Local poster: `assets/videos/mobile-development-poster.webp`
- Source item: [Programmer using his cell phone while working at his desk](https://mixkit.co/free-stock-video/programmer-using-his-cell-phone-while-working-at-his-desk-41638/)
- Contributor shown by source page: Mixkit
- Source asset: `https://assets.mixkit.co/videos/41638/41638-720.mp4`
- Source page facts at retrieval: 11 seconds, 24 fps, 3.65 MB, Mixkit Stock Video Free License
- Local edit: first 10 seconds, resized to 960×540, H.264 MP4, 24 fps, audio removed, fast-start metadata enabled
- Local sizes: video 462,859 bytes; poster 17,276 bytes
- Attribution requirement: none

## Implementation notes

- The initial HTML contains posters and local `data-src` paths, not active video sources.
- Video bytes are requested only after the visitor activates a play control.
- Posters remain available if playback fails.
- Recheck the source pages and licence before materially reusing or redistributing the underlying clips outside this website.

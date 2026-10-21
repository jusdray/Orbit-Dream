# Website Changes Summary Report

## Overview

This report summarizes the Our Services navigation, full-page transitions, Our Team and Contact layout work, product carousel changes, and KohBot preview updates.

## Changes delivered

### Our Services navigation and content

- Made the six service names clickable controls that select the corresponding service and update the preview.
- Synced active service selection with page scrolling and added service-by-service Up/Down keyboard navigation.
- Prevented service keyboard navigation from wrapping. Up from Software Development now moves back to the previous page; Down from the final service advances to Product.
- Added Left/Right keyboard navigation for solutions within the selected service. For example, Cyber Security cycles between DUTYCOM and LERMS without changing the service.
- Kept the preview’s on-screen Previous/Next arrows dedicated to cycling through solutions.
- Replaced the Software Development options Sales Rep Manager and Home2Class with:
  - KohBot — “Your intelligent digital companion and guide to Lagos State.”
  - CamperVerse — “corps member’s trusted digital companion”

### Page transitions and navbar navigation

- Added sequential wheel/trackpad snapping across the cinematic Home scenes, individual service scenes, Product, Our Team, and Contact.
- Kept the navbar limited to its named destinations while allowing wheel navigation through additional visual scenes.
- Added Up/Down keyboard page transitions while preserving the service section’s own keyboard controls.
- Made Product and Our Team scroll through their content normally, then transition to the adjacent page at their boundaries.
- Added transition guards so sustained wheel input does not skip through a section while a smooth transition is underway. The guard now releases on scroll completion or after its fallback timeout and wheel-idle period.
- Removed the Home text link from the navbar; the SoftSeer logo remains a Home link.
- Updated navbar destinations to scroll to the intended page top. About Us uses its scene position within the long Home timeline.
- Signaled navbar-driven navigation to the Services scroll logic so its internal snap behavior does not interrupt navigation to another section.

### Our Team and Contact layouts

- Resized the Our Team page to fit within one viewport, using responsive sizing for desktop, short viewports, and mobile screens.
- Removed the “THE TEAM” eyebrow label and positioned the “Architecturing The Future Of Tech” heading beneath the navbar.
- Reordered the Directors profiles to show Emmanuel Fakoya first and Folu Busari second.
- Swapped the Emmanuel and Folu profile and thumbnail images while leaving the images associated with their intended profile positions.
- Combined Contact and Footer into one viewport-height section so the footer fits with Contact and does not reveal the bottom of Our Team.

### KohBot preview

- Added an embedded KohBot website preview at `https://kohbot.ai/` when KohBot is selected.
- Added an “OPEN KOHBOT” control in the preview and an “Open kohbot.ai” link below it as direct-access paths.
- Changed the KohBot Live Overview control into a speech action using the browser’s Web Speech API. It can be stopped while speaking, cancels when the selected solution changes, and displays an error message if speech is unavailable or fails.
- The spoken overview describes KohBot as a digital companion and guide to Lagos State and mentions example public-service questions.
- Added the CamperVerse (`camperverse.ng`) solution preview with a secure-site launch panel, direct links, and a speakable Live Overview. CamperVerse identifies itself as CORPSMATE and describes finding an NYSC orientation camp.
- CamperVerse sends `X-Frame-Options: SAMEORIGIN`, so browsers block embedding it on this website. Its preview therefore presents an in-page launch card instead of a blank iframe.

## Issues encountered and resolutions

| Issue | Resolution |
|---|---|
| Service arrow navigation previously wrapped to Software Development. | Made the service arrow navigation non-wrapping and sent the boundary action to the adjacent page. |
| Product and Our Team could be skipped during sustained wheel input. | Held wheel input during smooth transitions and released the transition guard on scroll completion or after a fallback timeout plus wheel idle. |
| Contact and Footer did not fit together, and the Team section could appear at the Contact boundary. | Placed Contact and Footer in one viewport-height wrapper and treated them as one navigation destination. |
| The Our Services navbar link stopped short and showed the bottom of the previous section. | Scrolled to the Services section’s exact document top instead of relying on its scroll margin. |
| Navbar navigation could be interrupted by the Services section’s internal snap behavior. | Added a section-navigation event so internal service settling pauses during navbar-driven movement. |
| Up from Software Development required repeated key presses to leave Services. | Added a direct transition to the previous page at the service boundary. |
| The first interpretation of preview arrows changed services, not solutions. | Restored the arrows to Previous/Next solution and assigned keyboard Left/Right to the current service’s solution list. |
| KohBot’s embedded preview appeared blank in the browser test environment. | Kept the iframe preview, added direct links to open KohBot, and made the limitation explicit. The test environment reported the external iframe request as aborted, so a successful rendered embed was not confirmed there. |
| CamperVerse cannot be embedded on the site. | Confirmed its `X-Frame-Options: SAMEORIGIN` response blocks cross-site iframes; replaced the empty frame with a launch panel, direct links, and a speakable overview. |

## Files changed

- `client/src/components/site/SoftSeerSite.tsx` — navbar navigation, page transitions, Services keyboard behavior and content, solution carousel, and KohBot/CamperVerse previews and voice overviews.
- `client/src/components/site/TeamCarousel.tsx` — Team section markup and styling hooks for the single-viewport layout.
- `client/src/components/site/LowerSections.tsx` — Contact/Footer grouping and layout.
- `client/src/data/team.ts` — Director order/default and Emmanuel/Folu profile image assignments.
- `client/src/index.css` — responsive Our Team one-viewport layout rules.

## Validation and known limitations

- Browser checks verified navigation destinations, Our Team fitting a viewport at tested desktop/mobile sizes, service selection and solution changes, boundary transitions, KohBot speech synthesis, and CamperVerse speech synthesis and direct links.
- `pnpm.cmd check` passed after the final application changes.
- `pnpm.cmd build` passed after the final application changes.
- The production build continues to report an existing large-chunk warning, notably the HeroGlobe bundle (approximately 978 kB).
- The KohBot iframe was present and loaded as a frame in the browser harness, but its external page request was reported as aborted and the visible embedded preview appeared blank. The direct `kohbot.ai` links remain available; embedding should be rechecked in the deployed browser environment.
- CamperVerse is deliberately not embedded because its same-origin frame policy would block it. The preview provides a direct link to the live site instead.

# Figma Team Carousel Findings

The supplied reference is a 1440 by 944 dark `#011418` team-carousel stage with a cyan network-topology atmosphere, Nohemi typography, and a glass directory rail across the lower edge. Its hierarchy is: uppercase **THE TEAM** label, two-line headline, explanatory paragraph, three wide category tabs, a selected profile narrative, circular previous/next controls, a large right-aligned cutout portrait, and a lower thumbnail directory.

The active category tab uses a cyan outline with a short glowing cyan indicator at the bottom. The selection profile uses a large white name, cyan uppercase role, muted gray biography, outlined circular social controls, and a bright cyan rounded **About [name]** button. The supplied `18-507` asset is the primary Folu Busari cutout portrait used at the right side of the selected state. The topology background is asset `18-452`.

The first local implementation check confirmed that the Figma topology background, three category tabs, selected-profile treatment, Figma portrait asset, profile-detail link, arrow controls, and lower directory are present in the local team section. The official SoftSeer site confirms the four existing team names and roles used for the carousel data.

Focused comparison of the live section confirms the same top-to-bottom Figma composition: heading, glass category rail, left profile narrative, cyan circular controls, right portrait, and lower directory. The default directors view has been aligned to Folu Busari so the first state now mirrors the supplied reference.

The Principal Staffs tab was tested live. It changes the selected profile in place to Opeyemi Fakoya, updates the portrait and detail destination, and renders the verified LinkedIn control as a clickable external link.

The browser interaction harness opened a blank internal page when activating the About link, so the dedicated profile route will be verified directly by its application URL rather than relying on that harness transition.

Direct route verification confirmed that `/team/opeyemi-fakoya` renders the individual profile page with its portrait, biography, focus areas, return link, and a verified individual LinkedIn destination. The profile page’s back link returns to `/#section-team`.

Desktop and mobile profile-page screenshots confirmed the editorial layout remains readable and unclipped at both sizes. The team carousel continues to retain the complete Figma-derived composition in the live page.

The Stakeholders tab was tested in the live carousel and switches to the SoftSeer Partner Network selection while retaining the active tab indicator, contextual portrait treatment, and its detail-page destination.

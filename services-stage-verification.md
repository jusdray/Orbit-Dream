# Our Services Stage Verification

The live Our Services stage was reviewed after the protected tab-spacing reflow. The selected-solution tabs render as a visible row above the preview, with a clear visual gap before the cyan-framed video begins. The preview controls, preview labels, and solution description remain inside the right-hand stage.

The stage now uses a 780vh scroll container, an explicit fixed preview height, and separate stacking layers for header, tabs, and preview to prevent the media frame from covering the tabs.

The section-boundary check confirmed that the bottom of `#section-our-services` and the top of `#section-products` meet at the same scroll position. The services sticky scene is now clipped to its own viewport, while Selected Platforms establishes its own stacking context above the normal document flow.

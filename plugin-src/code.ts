import { initPlugin } from "./init";

figma.showUI(__html__, {
  width: 240, // in pixels
  height: 500, // in pixels
  themeColors: true, // this enables support of dark version
  title: "My New Plugin", // the title that will show up in the popup where your plugin runs
});

figma.ui.onmessage = (msg) => {
  // when sending messages from UI to Figma, this is where you receive them
  // use "type" prop in order to know what to run
  switch (msg.type) {
    default:
      break;
  }

  // each action inside the plugin will be an undo action
  //
  // if we don't have it here, on Cmd + Z click,
  // it will undo everything at once instead of one step at a time
  figma.commitUndo();
};

initPlugin();

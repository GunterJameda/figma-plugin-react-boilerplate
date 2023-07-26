## React + Typescript Figma Plugin Boilerplate

This is a boilerplate made with React and Typescript that aims to provide devs a way of easily and fastly bootstrap a new Figma plugin.

### How to start

1. Clone the repo
1. Check dependencies and delete anything you don't need
1. `yarn dev` or `npm run dev`
1. You're rocking!

### Dependencies

Apart from `react` and `react-dom`, there are 2 others, that might or might not be helpful:

- `react-colorful` - This is used to deal with colors. Check it's npm page to know more. It's here as a suggestion of what you could use to handle colors. No need to use this one. Beware though, there's one component using it. Check the `Project Structure` section for more.
- `classnames` - If you already use React on a daily basis, you know what this is aimed for. For those who do not, it's aimed at helping you create class props for html tags when the logic for it is not straightforward as writing the string there. You can have logic in here to calculate the class that will be generated based on a different number of variables. Check it's npm page to know more.

### Project Structure

- `plugin-src` - this folder has all code that will run on Figma side. It's here where you manipulate the file and any other things you might need to do with the file directly.
  - `code.ts` - entry point for the code. It has a few configs, a message catcher with the bare minimum for it to work and a call to `initPlugin`
  - `init.ts` - This is where `initPlugin` can be found. This function holds all code you need to run right when the plugin is starting. Let's say you need to check how many pages the file has to setup something: this is the place for that.
- `ui-src` - This is your UI. This is the React part. If you open the folder, it seems like a normal React app. And it indeed is.
  - `common` - a few leftovers from a previous project.
    - `assets` - this directory contains 2 SVGs needed for the good use of Dropdown.
    - `hooks` - you'll find the `useClickOutside` hook which is based in an online version. The difference between this version and the online one is the typing.
    - `components` - a few components custom developed. From all these, please pay attention to `ColorChit` and `Dropdown` which are entirely based on the ones you can find on Figma. A few details might be missing, but you'll note the ressemblance. Others are custom ones that also go well in the Figma design system.
      - `ColorChit` and `ColorInput` are using `react-colorful` as a dependency. Be careful while deleting it, as it might stop working.

### What else can I find here?

Vite is being used as the development server. Change the customization as you wish.

In `App.css`, you can find a variable definition for a color. That color is being used by dropdown component in both light and dark theme.

### Should I use everything that comes in here?

Absolutely not. This is a template created with the sole purpose of speeding up the bootstrap of a Figma plugin with a well defined project structure. If you find anything that needs your special touch and you don't need at all, proceed with the necessary changes when bootstrapping your plugin.

### Contributions & Questions

Feel free to open Pull requests or Issues to contribute to this project or ask questions.

When opening a Pull Request, do not forget to:

- explain what problem did you find
- why it might be a problem (it might be obvious for you but not for others; let's help each other)
- how are you solving it
- risks and other issues this might introduce

If this info is lacking, triage will be hard to do and the PR might be closed due to this.

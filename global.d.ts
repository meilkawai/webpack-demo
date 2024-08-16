declare module '*.less' {
    const content: { [className: string]: string };
    export default content;
  }
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  declare module '*.js' {
    const content: any;
    export default content;
  }
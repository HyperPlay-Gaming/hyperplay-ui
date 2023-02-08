# Frotend Design System

## Type System

the type system is adjustable with two variables. Like you've seen, font-size sets the medium font size (1rem) and --text-scale-ratio adjusts the difference between text size steps. By keeping these as variables instead of hardcoding all the --text-<size> values in rem units, we ensure that each step is exactly 20% (if --text-scale-ratio equals 1.2) different from the next step. This ensures visual consistency and gives options uniformly along the range of text sizes we want to support. This makes it easy to iterate, add breakpoints, and prevents the situation where one font size is updated but the others are not whether that be in a breakpoint or in the \_typography.scss file. It also isn't much of a limitation at all on the design side of things.

## Spacing System

### Relative Spacing

the spacing system is first specified in em units. This means that it is a multiple of that element's font size. So let's say you have h6 at 1 rem (16px) and want margin-bottom to be 50% of this font size. By setting margin-bottom = 0.5 em (--space-xs) on the element, you accomplish this. When someone introduces a breakpoint later and changes the font, the margin-bottom won't have to be updated because it's specified in em. (So you probably won't have to update these css vars in media query breakpoints.) By creating css variables for these sizes, we constrain the components to use one of these predefined sizes, which again enforces visual consistency and makes the code much more maintainable. Designers can now iterate on the entire app's margins and paddings by tweaking these values.

### Fixed Spacing

The fixed spacing system is intended for margins and paddings that shouldn't change based on the font size of the element. So if you want something to truly be 4px instead of 25% of a 1rem, use this.

## Breakpoints 

Breakpoints can be added easily for different screen sizes. It is recommended to use the first of the following approaches to keep the breakpoints within the element it is affecting rather than at the end of the file with all the other elements' breakpoints.

```
/* Example breakpoint */
// PREFERRED:
@use 'styles/utilities/variables';
:root {
  /* type scale */
  @include variables.for-mobile-only {
    --text-xs: 12px;
    --text-sm: 14px;
    --text-md: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 28px;
    --text-3xl: 40px;
    --text-4xl: 50px;
    --text-5xl: 55px;
    --text-6xl: 60px;
  }
}
// or [NOT RECOMMENDED]:
@media screen and (max-width: 800px) {
  :root {
    font-size: 16px;
    --text-scale-ratio: 1.2;
  }
}
```

For Text
```
/* EXAMPLE BREAKPOINTS */
:root {
  /* type scale */
  @include variables.for-mobile-only {
    --text-scale-ratio: 1.16;
    font-size: 12px;
  }
  @include variables.for-tablet-portrait-up {
    --text-scale-ratio: 1.18;
    font-size: 14px;
  }
  @include variables.for-desktop-up {
    --text-scale-ratio: 1.2;
    font-size: 16px;
  }
  @include variables.for-big-desktop-up {
    --text-scale-ratio: 1.3;
    font-size: 20px;
  }
}
```

or if the text-scale-ratio method is not flexible enough to meet designer requirements, 
```
:root {
  /* type scale */
  @include variables.for-mobile-only {
    --text-xs: 12px;
    --text-sm: 14px;
    --text-md: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 28px;
    --text-3xl: 40px;
    --text-4xl: 50px;
    --text-5xl: 55px;
    --text-6xl: 60px;
  }
  @include variables.for-tablet-portrait-up {
    --text-xs: 12px;
    --text-sm: 14px;
    --text-md: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 30px;
    --text-3xl: 42px;
    --text-4xl: 60px;
    --text-5xl: 80px;
    --text-6xl: 100px;
  }
  @include variables.for-desktop-up {
    --text-xs: 14px;
    --text-sm: 16px;
    --text-md: 18px;
    --text-lg: 20px;
    --text-xl: 24px;
    --text-2xl: 32px;
    --text-3xl: 48px;
    --text-4xl: 69px;
    --text-5xl: 100px;
    --text-6xl: 180px;
  }
}
```

## FAQ

#### How do I pick the spacing values?

Ideally there is a figma file that has already designed the component. If not, it will be up to the frontend dev to select a font size or spacing value.

#### How should I handle border-radius?

If you want it to adjust dynamically to font size changes in the element (e.g. when hitting a breakpoint), use --space-X. If you want a constant value in px, use --space-X-fixed.

#### Why should I use a spacing value instead of a text value?

It's important that we keep our design system parameterized and defined in one place for maintainability and ease of iteration by our designers.

#### I can't find the px value I want. Can I hardcode it?

This isn't good practice. It's important to keep our text sizes, margins, and paddings constrained to a small number of choices so that we can provide a visual consistent user experience.

If you truly need a different value, consider changing the --space or --space fixed category value defined in \_spacing.scss. Consult the designers first though.

# Image Carousel

## References

Lazy loading images - https://web.dev/articles/lazy-loading-images

Building image carousel from scratch using vanilla JavaScript - https://blog.logrocket.com/build-image-carousel-scratch-vanilla-javascript/

Removing image padding that is showing up - https://stackoverflow.com/questions/4760002/how-to-remove-image-padding-that-is-showing-up-unintentionally

Optimize CLS - https://web.dev/articles/optimize-cls

- Images are inline-blocks, we can set `display: block;` to remove the spacing

## Image references

- https://unsplash.com/photos/a-ball-sitting-on-top-of-a-white-table-VT2Ygvzn49Y
- https://unsplash.com/photos/the-sun-is-setting-over-a-vast-expanse-of-sand-dunes-h4eHV9CRxUc

Image carousels are very common across various types of websites, including online stores, news sites and many more
They're great for advertising, showcasing things, showing several things using limited screen size, and can actually be made using things you have already learned! They are also highly customizable - you can make them auto-scroll, allow users to manually cycle between slides, skip to certain slides, etc.

Typically, they consist of a div that acts as the "picture frame", where behind that div, there is another much wider div containing the carousel's images. This strip of images can then move behind the picture frame, showing a different image depending on what part of the strip is visible. Any additional controls or features can then be placed on top of the entire thing

https://www.theodinproject.com/lessons/node-path-javascript-dynamic-user-interface-interactions

# Assignment

Create an image carousel

- It should contain arrows on each side to advance the image forward or backward.
- It should automatically move forward every 5 seconds
- It should contain the little navigation circles at the bottom that indicate which slide you are on (and they should be clickable to advance to that particular slide)

Don't spend too much time worrying about getting your images to display at the correct size - it's more important to get the carousel rotating

1. This one is a little more involved than the previous task, so think about how you would set up the different elements within the site
2. Setup a very wide `div` which will contain the individual "slides" of each image. By appropriately positioning that `div` inside a container `div` (which acts like a picture frame), you can choose which slide is visible at any given time
3. Once you have the slider positioned properly, build functions for `next` and `previous` which will advance to the next or the previous slide accordingly. The transition doesn't need to be smooth or animated. Only make it switch to the correct slide
4. Setup arrow buttons which activate those functions and play with cycling through the images
5. Add in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are in. Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide
6. Add a timeout which advances the slides every 5 seconds
7. Play around with your slideshow!

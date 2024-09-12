# CS 260 Startup Project
[Notes](https://github.com/kayleigh-gustafson/startup/blob/main/notes.md)
## Elevator Pitch
There are a lot of ways to create art, and it's not uncommon to combine them. I prefer to do sketches and line art on paper, but I love coloring things digitally. This application will help me and those like me! Users will upload a scan or a photo of their pen-and-paper line art, and the web app will use a vector API to convert the bitmap image into a smooth, clean vector line art file that's ready to use in a digital art program. Other use cases could include vectorizing logos or hand-drawn fonts.
![Main page mockup](./images/mainpage.jpg)
![Popup dialog mockups](./images/dialogs.jpg)
## Key Features
- Log in to save art and preferences
- Upload an image from your device
- User can adjust filters (brightness, contrast, etc) to make the line art as clear as possible
- Convert filtered bitmap image into a clean vector file with a transparent background
- Download converted files
## Technologies
- HTML: File input, image filter sliders, structure of the page (1 main page, with a login screen and a list of the user's previously converted images, that could be popup dialogs or their own pages)
- CSS: Style website to look nice and use whitespace well, and use an attractive color palette and font scheme
- React: Add interactivity, make dialogs appear and disappear
- Web Service: Image filtering and vector conversion APIs
- Authentication: User can log in to save the images they convert
- Database: Save the images created by the user so they can access them again later
- WebSocket: Update a preview of the final result in real time
# Notes

## AWS Web Server
- **Creating the server instance:** Change location to us-east-1, use AMI ID ami-0b009f6c56cdd83ed, make sure that all traffic is allowed
- **SSH into the server:** ssh -i [key pair file] ubuntu@[ip address], use cd to change directories, ls -l to list files, exit to stop
- **Elastic IP:** Allocate an elastic IP to keep the same IP after server restart
- **My server:** Elastic IP: 34.232.209.210, web address: http://34.232.209.210

## Deployment
- ./deployFiles.sh -k yourpemkey -h yourdomain -s startup

## CSS Notes
### Meta viewport tag
```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```
### Animation
```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```
### Units
| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |
### Media queries
```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```
### Grid
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

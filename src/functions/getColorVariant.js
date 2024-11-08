// Color library, found at https://github.com/vinaypillai/ac-colors
import "https://cdn.jsdelivr.net/npm/ac-colors@1/dist/ac-colors.min.js";

export default function getColorVariant(hex, lightness, maxSaturation=undefined) {
    let inputColor = new Color({"color":hex,"type":"hex"});
    let hsl = inputColor.hsl;
    if (lightness!==undefined) {
        hsl[2] = lightness;
    }
    if (maxSaturation!==undefined && hsl[1] > maxSaturation) {
        hsl[1] = maxSaturation;
    }
    let outputColor = new Color({"color":hsl,"type":"hsl"})
    return(outputColor.hex)
  }
import { Pixel } from './app-state'

export const createSegments = (pixels: ReadonlyArray<Pixel>): string => {
  const segmentPixels = segment(pixels)
  let segementString = ''
  let prevPixel: Pixel = segmentPixels[0]
  let startIndex = 0
  
  segmentPixels.forEach((pixel, index) => {
    if (prevPixel.hex !== pixel.hex) {
      const pixelIndex = (startIndex === index - 1) ? `${startIndex}` : `${startIndex},${index}`
      segementString += `${pixelIndex},[${prevPixel.rgb[0]},${prevPixel.rgb[1]},${prevPixel.rgb[2]}], `
      startIndex = index
    }
    if(index + 1 === segmentPixels.length){
      segementString += `${startIndex},${index + 1},[${pixel.rgb[0]},${pixel.rgb[1]},${pixel.rgb[2]}], `
    }

    prevPixel = pixel
  })
  segementString = `[${segementString.slice(0, -2)}]`

  return segementString
}

export const segment = (pixels: ReadonlyArray<Pixel>): ReadonlyArray<Pixel> => {
  let newPixels: Array<Pixel> = []
  let odd = true
  for(let i = 0; i < pixels.length; i += 16) {
    const row = odd ? pixels.slice(i, i + 16).reverse() : pixels.slice(i, i + 16)
    newPixels = newPixels.concat(row)
    odd = !odd
  }

  return newPixels
}

export const curlCommand = (ipAddress: string, segementString: string): string => {
  return `curl -X POST "http://${ipAddress}/json/state" -H "Content-Type: application/json" -d '{"on":true, "bri":100, "seg":{"i":${segementString}}}'`
}

export async function testMatrix(ipAddress: string, segementString: string): Promise<Response> {
  const data = {
    "on": true,
    "bri": 100,
    "seg": {
      "i": JSON.parse(segementString)
    }
  }

  await turnMatrixOff(ipAddress)

  return request(ipAddress, JSON.stringify(data))
}

export async function turnMatrixOff(ipAddress: string): Promise<Response> {
  return request(ipAddress, JSON.stringify({
    "on": false
  }))
}

async function request(ipAddress: string, body: string): Promise<Response> {
  return fetch(`http://${ipAddress}/json/state`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
}
const chunk = (b64: string): Array<string> => {
  const numChunks = Math.ceil(Buffer.byteLength(b64) / 350000)
  const size = Math.ceil(b64.length / numChunks);
  
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = b64.substr(o, size)
  }

  return chunks
}

export default chunk;
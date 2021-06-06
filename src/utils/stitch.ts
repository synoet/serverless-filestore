const stitch = (chunks: any) => {
  const dict = {}
  console.log(chunks.length)
  for(let idx = 0; idx < chunks.length; idx++){
    console.log(chunks[idx].chunk);
    if(chunks[idx].id in dict) dict[chunks[idx].id].content = dict[chunks[idx].id].content.concat(chunks[idx].content);

    if(!(chunks[idx].id in dict)) dict[chunks[idx].id] = {content: chunks[idx].content, name: chunks[idx].path, type: chunks[idx].type};
  }

  const files = [];

  for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
          files.push( dict[key] );
      }
  }

  return files;
}

export default stitch;
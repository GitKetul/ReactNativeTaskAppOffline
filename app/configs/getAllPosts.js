const getAllPosts = async (next, skip) => {
    console.log(next, skip);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    var raw = JSON.stringify({
      query: `query{\n  imagePostsConnection(orderBy:name_ASC,first:${next},skip:${skip}){\n    aggregate{\n      count\n    }\n    edges{\n      node{\n        image\n        name\n      }\n    }\n    pageInfo{\n      hasNextPage\n    }\n  }\n}`,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(
        'https://us1.prisma.sh/mrugrajsinh-vansadia-797f28/ReactNativeTask/dev',
        requestOptions,
      );
  
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  };
  
  export default getAllPosts;
  
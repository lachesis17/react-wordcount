### **Word count with React and nodejs - reused function from FASTAPI-Docker**

_Hyphonated words and words containing an apostrophe are treat as a single word for simplicity._
_Dates are one word, numbers are one word, all symbols are discarded apart from ampersand "&", since it's "and"!_

Either enter text into the text input or drag & drop a plaintext.txt file into the text input.

Hosted via vercel at: https://reactnodejs-wordcount.vercel.app/

# Commands:
To run locally:
- Uncomment the localhost line 32 in src/App.js and line 37 in src/TextInput.js
- Run two terminals, one for the server:
```
node api/server.js
```

- And one for the React app:
```
npm run start
```

- App will be available on [http://localhost:3000/](http://localhost:3000/)
- Server will run on [http://localhost:5000/](http://localhost:5000/)
- API request on: [http://localhost:5000/api/count-words](http://localhost:5000/api/count-words)

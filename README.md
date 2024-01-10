### **Word count with React and nodejs - reused function from FASTAPI-Docker**

_Hyphonated words and words containing an apostrophe are treat as a single word for simplicity._
_Dates are one word, numbers are one word, all symbols are discarded apart from ampersand "&", since it's "and"!_

Either enter text into the text input or drag & drop a plaintext.txt file into the text input.

Hosted via vercel at: https://reactnodejs-wordcount.vercel.app/

# Commands:
To run locally, uncomment the localhost line 32 in src/App.js and line 37 in src/TextInput.js in  run two terminals, one for the server:
```
node api/server.js
```

And one for the React app:
```
npm run start
```

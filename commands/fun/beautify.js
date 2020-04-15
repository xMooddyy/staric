const { js_beautify } = require('js-beautify');

module.exports = {
    config: {
        name: 'beautify',
        description: 'Make a code better!',
        usage: '<code>',
        category: 'fun',
        accessableby: 'Members',
        cooldown: 5,
        enabled: true
    },
    run: async (bot, message, args) => {


  const reduceIndentation = (string) => {
    let whitespace = string.match(/^(\s+)/);
    if (!whitespace) return string;

    whitespace = whitespace[0].replace('\n', '');
    return string.split('\n').map(line => line.replace(whitespace, '')).join('\n');
  };

  const format = async (msg) => {
    const messages = msg.channel.messages.array().reverse();
    let code;
    const codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;

    for (let m = 0; m < messages.length; m++) {
      const messagea = messages[m];
      const groups = codeRegex.exec(message.content);

      if (groups && groups[1].length) {
        code = groups[1];
        break;
      }
    }
    if (!code) throw new Error('No Javascript codeblock found.');

    const beautifiedCode = js_beautify(code, { indent_size: 2, brace_style: 'collapse', jslint_happy: true });
    const str = await reduceIndentation(beautifiedCode);
    return (`${'```js'}\n${str}\n${'```'}`);
  };
      let res;
    try {
      res = await format(messagea);
    }
    catch(e) {
      res = e;
    }
    return message.channel.send(res);

    }
};
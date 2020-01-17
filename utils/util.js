export default class Util {
    static log (...messages) {
       (function expantion(messages,count = 0) {
            messages.forEach(msg => {
                Array.isArray(msg)
                    ? expantion(msg,++count)
                    : console.log('\t'.repeat(count) + msg);
            });
        })([(new Date).toString(),messages]);
    }
}
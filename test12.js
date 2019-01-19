if (!process.argv[2]) {
    console.log("Tolong sertakan nama file sebagai inputan soalnya misalnya 'node test12.js data.js'");
    process.exit(0);
}   
const readline = require('readline');
const fs = require('fs');
const tanya = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban > '

});
let hitung = 0;
let salah = 0;
console.log("------------------------------------------------------------------------------------------------------");
console.log("|Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file ini 'Data.json'.| ");
console.log("|Untuk bermain, jawablah dengan jawaban yang sesuai.                                                 | ");
console.log("|Gunakan 'skip'untuk menangguhkan pertanyaannya, dan diakhir pertanyaan akan ditanyakan lagi.        | ");
console.log("------------------------------------------------------------------------------------------------------");
console.log('Pertanyaan : ' + tanya[hitung].definition);

rl.prompt();

rl.on('line', (jawaban) => {
    if (jawaban.trim().toLowerCase() == 'skip') {
        tanya.push(tanya[hitung])
        hitung++
        console.log('Pertanyaan : ' + tanya[hitung].definition);
        rl.prompt();
    } else {
        if (jawaban.trim().toLowerCase() == tanya[hitung].term.toLowerCase()) {
            console.log('Anda Beruntung');
            hitung++
        } else {
            salah++
            console.log(`Anda kurang beruntng! anda telah salah ${salah} kali, silahkan coba lagi`);
        }
        if (hitung < tanya.length) {
            console.log('Pertanyaan : ' + tanya[hitung].definition);

        } else {
            console.log('Anda Berhasil');
            rl.close()
        }
    }
    
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);

});

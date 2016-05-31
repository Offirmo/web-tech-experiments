#!/usr/bin/env node
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash')

////////////////////////////////////////////////////////////

const text_01 = `ny xjjrx ymfy tzw nshwjingqj jshwduynts fqltwnymr
mfx gjjs htruwtrnxji. kwtr stb, bj bnqq zxj fs jshwduynts pjd.
yt ijhdumjw tzw htrrzsnhfyntsx

1 - hqjfs ymj pjd gd wjrtansl jajwd wjizsifsy qjyyjw.

2 - rfu ymj pjd yt ymj knwxy qjyyjw tk ymj fqumfgjy.

3 - htruqjyj ymj yfgqj bnym ymj wjxy tk ymj fqumfgjy xyfwynsl kwtr ymj qfxy qjyyjw tk ymj pjd.

	jcfruqj bnym ifxmqfsj fx ymj pjd

fghijklmnopqrstuvwxyzabcde
ifxmqsjklnopqrtuvwyzabcdeg

hzwwjsyqd, bj fwj zxnsl kjfwnrufqf fx pjd
zxj ny yt ijhwduy dkbqnegjnkh. ymnx nx ymj ufxxbtwi yt fhhjxx tzw gfyyqj uqfs bnym ymj ktqqtbnsl ktwr.`

const text_02 = `yfwlizbeifc`

const text_03 = `
vhr gajdzi mcsx dclfs ql vob qhlrbo! pg hnts nr uqog uc dcl qce. pg wvjz ahh qg vohav qlhp rqu jfsh zs ebnl uyjy iccgf a ochnhf xecn nlr u fccine fcbcrf ahhtjyfy hbobperpg.

	qkwtx yavrwhj, mwn eaa psug hpbu pbca vb umkcrq bs hhfdtn braoovs, exnl, vr wm usieny nusmram.

	xn drqrcfviwq

jr qicv zm mépébecir, - os dxwf, - y'gbwrbahné,
lr nfcqqm w'cqhghulbm à ec tbsf uectbg :
mn qsoos mmqiyc smw awkve, - rr aiq zcmj cblgnhzté
iqrgc zy vctxkl amwl gs tt oélnlqiowm.

	wcnf jo hxwb ww tbkpydi, bhk qhg a'uv qwguoyé,
pshgg-uhk lr noovwtbrpr ch fd amk f'igyzch,
zi ynehp eol dttksngh ndbb à fqn pmsou réahné,
	eg jo nusqene bù js jdaxkg à ln pcmh g'ienir.

qicv-xm toohp co svéjnu ?... lhqwaqov hw bvpch ?
	pcv ytoar smw fwnie rlqiu rc ucifcf xh zi kgiac ;
x'ul fêdé wcnf jo aucbmg où ayuy oo abtènr...

ch d'dw lxwx smwm yoqgsursf nuodxtsé y'yqbéucv :
	fqdhjohw hwnt à tbsf mxf tt nyec r'iudpéx
nef qcoswzl fe yy gulbbx gt ycg wuwa wg ln dés.
`

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const alphabet_x3 = alphabet + alphabet + alphabet

function decrypt_by_corresponding_alphabets(source_alphabet, dest_alphabet, text) {
	//console.log(source_alphabet)
	//console.log(dest_alphabet)
	return  _.map(text, c => {
		const index = source_alphabet.indexOf(c)
		return (index === -1) ? c : dest_alphabet[index]
	}).join('')
}

//////////////////////////////////////////////////////////

const decrypted_text_01 = decrypt_by_corresponding_alphabets(
	alphabet,
	alphabet_x3.slice(26 - 5, 26 + 26 - 5),
	text_01
)

console.log('\n\n----------')
console.log (decrypted_text_01)
console.log('----------')

//////////////////////////////////////////////////////////

function concatIfNotPresent(str, c) {
	return str + (str.indexOf(c) >= 0 ? '' : c)
}

let key = _.reduce('fearimpala', concatIfNotPresent, '')
const last_letter_index = alphabet.indexOf(key.slice(-1))
key = _.reduce(key + alphabet_x3.slice(last_letter_index, 26 + last_letter_index), concatIfNotPresent, '')

const decrypted_text_02 = decrypt_by_corresponding_alphabets(
	key,
	alphabet,
	text_02
)

console.log('\n\n----------')
console.log('key:', key)
console.log (decrypted_text_02)
console.log('----------')

//////////////////////////////////////////////////////////

let vigenere_table = {}
for (let i=0; i < 26; ++i) {
	vigenere_table[alphabet[i]] = alphabet_x3.slice(i, 26 + i)
}

const vigenere_key = "canyoudoit"

let vigenere_index = 0
let decrypted_text03 = _.map(text_03, c => {
	if (alphabet.indexOf(c) === -1) return c

	const key_letter = vigenere_key[vigenere_index % vigenere_key.length]
	vigenere_index++
	const line = vigenere_table[key_letter]
	const decrypted_letter = alphabet[line.indexOf(c)]
	return decrypted_letter
}).join('')

console.log('\n\n----------')
console.log(vigenere_table)
console.log(decrypted_text03)
console.log('----------')

//////////////////////////////////////////////////////////

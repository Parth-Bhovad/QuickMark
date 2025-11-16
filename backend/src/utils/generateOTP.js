function generateEmailOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

function generateAttendanceOTP(length = 6) {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // no O/I
  // const lower = 'abcdefghijkmnpqrstuvwxyz'; // no o/l
  const digits = '23456789'; // no 0/1
  // const special = '!@#&*';

  const all = upper + digits;
  
  let otp = '';
  for (let i = 0; i < length; i++) {
    const charSet = [upper, digits][i % 2]; // rotate types
    otp += charSet[Math.floor(Math.random() * charSet.length)];
  }

  // Shuffle the result to avoid predictable order
  otp = otp.split('').sort(() => 0.5 - Math.random()).join('');
  return otp;
}


const verificationCodes = new Map();
function storeVerificationCode(key, value, timeLimit = 10 * 60 * 1000) {
  verificationCodes.set(key, value);
  // Auto-delete code after timeLimit
  setTimeout(() => verificationCodes.delete(key), timeLimit);
}
function getVerificationCode(key) {
  return verificationCodes.get(key);
}

function deleteVerificationCode(key) {
  verificationCodes.delete(key);
}

export { generateEmailOTP, generateAttendanceOTP, storeVerificationCode, getVerificationCode, deleteVerificationCode };
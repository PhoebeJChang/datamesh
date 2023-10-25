import bcrypt from 'bcryptjs'


export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const checkPassword = async (hash, password) => {
  const checkedPassword = bcrypt.compare(hash, password);
  return checkedPassword;
}
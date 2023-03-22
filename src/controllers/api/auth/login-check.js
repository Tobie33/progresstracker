import _ from 'lodash'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersLoginCheck = async (req, res) => {
  try {
    const { session: { userId } } = req
    const foundUser = await prisma.user.findFirstOrThrow({
      where: {
        id: userId || 0
      },
      include: {
        projects: true
      }
    })
    return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersLoginCheck

import _ from 'lodash'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersFindUser = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundUser = await prisma.user.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        projects: true,
        comments: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersFindUser

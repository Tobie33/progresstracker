import _ from 'lodash'
import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersFindUsers = async (req, res) => {
  try {
    const foundUsers = await prisma.user.findMany({
      include: {
        projects: true,
        comments: true
      },
      rejectOnNotFound: true
    })
    const omittedPasswordUsers = foundUsers.map((user) => _.omit(user, ['passwordHash']))
    return res.status(200).json(omittedPasswordUsers)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersFindUsers

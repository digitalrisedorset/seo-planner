export const authenticateWithCredentials = async (_root, { email, password }, context) => {
    const user = await context.db.User.findOne({ where: { email } })

    if (!user) {
        throw new Error("User not found")
    }

    const isValid = await context.sudo().db.User.checkPassword?.(user, password) // or custom bcrypt compare

    if (!isValid) {
        throw new Error("Invalid password")
    }

    await context.sessionStrategy.start({
        itemId: user.id,
        data: {
            isAdmin: user.isAdmin,
            provider: user.provider,
        },
    })

    return {
        success: true,
        message: "Logged in successfully",
    }
}

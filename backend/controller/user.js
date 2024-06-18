const updateUserProfile = async (req,res) => {

}

const getUserDetails = async (req,res) => {
    const userId = parseInt(req.params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        events: true, // Include related events
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive information like password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
}

module.exports = {
    updateUserProfile,
    getUserDetails
}
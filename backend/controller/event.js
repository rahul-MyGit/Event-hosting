const getAllEvents = async (req,res)=>{
    try {
        const events = await prisma.event.findMany({
          include: {
            host: {
              select: {
                id: true,
                email: true,
                name: true,
                
              },
            },
          },
        });
        res.json(events);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching events' });
    }
}
module.exports = {getAllEvents};
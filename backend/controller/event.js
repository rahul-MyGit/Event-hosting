const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


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

const addEvent = async (req,res)=>{
  const { title, description, date, location } = req.body;

  const userId = req.user;
  try {
    // Create event in the database
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        hostId : userId.id,
      },
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error });
  }
}
module.exports = {
  getAllEvents,
  addEvent
};
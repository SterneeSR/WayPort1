// src/utils/cli.js
const readline = require('readline');
const prisma = require('../prisma');

function ask(q, rl) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

module.exports = function startCLI(io) { // <-- receive io here
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('Type "new" to create a new ride, "exit" to quit.');

  rl.on('line', async (input) => {
    const cmd = input.trim();

    if (cmd === 'new') {
      try {
        const start_location = await ask('Start location: ', rl);
        const end_location = await ask('End location: ', rl);
        const fare_amount = parseFloat(await ask('Fare amount: ', rl) || '0');
        const start_time = await ask('Start time (YYYY-MM-DD HH:mm) or blank: ', rl);
        const end_time = await ask('End time (YYYY-MM-DD HH:mm) or blank: ', rl);

        // create ride in DB
        const ride = await prisma.ride.create({
          data: {
            start_location,
            end_location,
            fare_amount,
            start_time: start_time ? new Date(start_time) : null,
            end_time: end_time ? new Date(end_time) : null,
            status: 'Payment_Pending', // initial
          },
        });

        console.log('Ride created with id', ride.ride_id);

        // ✅ Emit only if io exists
        if (io) {
          io.emit('ride:new', ride);
          console.log('📡 Broadcasted ride:new to clients:', ride);
        } else {
          console.warn('⚠️ io not available, ride not broadcasted');
        }

      } catch (e) {
        console.error('❌ Error creating ride:', e);
      }
    } else if (cmd === 'exit') {
      console.log('👋 Exiting CLI.');
      rl.close();
      process.exit(0);
    } else {
      console.log('❓ Unknown command. Type "new" or "exit".');
    }
  });
};

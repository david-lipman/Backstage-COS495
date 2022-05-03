// Creates a connection to our Prisma Client.
// Whenever you need access to the DB, import the 'prisma' instance into the file where it's needed
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // allow global `var` declarations
  /* eslint-disable-next-line */
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
// const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
// export default prisma;
// add prisma to the NodeJS global type
// interface CustomNodeJsGlobal extends NodeJS.Global {
//   prisma: PrismaClient;
// }

// // Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;

import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main(){
    const alice = await prisma.user.upsert({
        where: {number : '9999999999'},
        update: {},
        create : {
            number : '9999999999',
            password: await bcrypt.hash('alice', 10),
            name : "alice",
            OnRampTransaction:{
                create: {
                    startTime: new Date(),
                    status : 'Success',
                    amount : 20000,
                    token : '121',
                    provider: 'HDFC Bank',
                },
            },
        },
    })

    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {},
        create: {
          number: '9999999998',
          password: await bcrypt.hash('bob', 10),
          name: 'bob',
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Failure",
              amount: 2000,
              token: "123",
              provider: "HDFC Bank",
            },
          },
        },
      })

      const john = await prisma.user.upsert({
        where: { number: '1111111111' },
        update: {},
        create: {
          number: '1111111111',
          password: await bcrypt.hash('john', 10),
          name: 'john',
          Balance: {
            create: {
                amount: 40000,
                locked: 0
            }
          },
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Success",
              amount: 20000,
              token: "token__1",
              provider: "HDFC Bank",
            },
          },
        },
      })

      const neha = await prisma.user.upsert({
        where: { number: '1111111112' },
        update: {},
        create: {
          number: '1111111112',
          password: await bcrypt.hash('john', 10),
          name: 'neha',
          Balance: {
            create: {
                amount: 10000,
                locked: 0
            }
          },
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Success",
              amount: 10000,
              token: "token__12",
              provider: "HDFC Bank",
            },
          },
        },
      })

      console.log({alice , bob , john , neha})
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
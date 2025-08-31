import { Context } from '@/pages/api/graphql';

export const resolvers = {
    Query:{
        injuryReports:async(parent:any, args: { userId: string }, context: Context)=>{
            return await context.prisma.injuryReport.findMany({
                where: {
                    userId: args.userId
                },
                include: {
                    injuries: true
                }
            });
        },
        getAllUsers: async(parent:any, args: any, context: Context)=>{
            return await context.prisma.user.findMany();
        },
        getReport: async(parent:any, args: { id: number }, context: Context)=>{
            return await context.prisma.injuryReport.findUnique({
                where: {
                    id: args.id
                },
                include: {
                    injuries: true
                }
            });
        },
        getUser: async (parent: any, args: { id: string }, context: Context) => {
            return await context.prisma.user.findUnique({
                where: {
                    id: args.id
                }
            })
        }
    },
    Mutation: {
        createInjuryReport: async (parent:any, args: { userId: string, name: string, datetime: string }, context: Context) => {
            return await context.prisma.injuryReport.create({
                data: {
                    userId: args.userId,
                    name: args.name,
                    datetime: args.datetime
                }
            });
        },
        updateInjuryReport: async (parent:any, args: { id: number, name?: string, datetime?: string, injuries?: { injuryDescription: string, x: number, y: number }[] }, context: Context) => {
            const { id, name, datetime, injuries } = args;

            // Use a transaction to ensure atomicity
            return await context.prisma.$transaction(async (prisma) => {
                // 1. Update the report details
                const updatedReport = await prisma.injuryReport.update({
                    where: { id },
                    data: {
                        name: name,
                        datetime: datetime,
                    },
                });

                // 2. Delete old injury details
                await prisma.injuryDetail.deleteMany({
                    where: { reportId: id },
                });

                // 3. Create new injury details if provided
                if (injuries && injuries.length > 0) {
                    await prisma.injuryDetail.createMany({
                        data: injuries.map(injury => ({
                            reportId: id,
                            ...injury,
                        })),
                    });
                }
                return updatedReport;
            });
        },
        deleteInjuryReport: async (parent:any, args: { id: number }, context: Context) => {
            await context.prisma.injuryDetail.deleteMany({
                where: {
                    reportId: args.id
                }
            })
            return await context.prisma.injuryReport.delete({
                where: {
                    id: args.id
                }
            });
        },
        createInjuryDetail: async (parent:any, args: { reportId: number, injuryDescription: string, x: number, y: number }, context: Context) => {
            return await context.prisma.injuryDetail.create({
                data: {
                    reportId: args.reportId,
                    injuryDescription: args.injuryDescription,
                    x: args.x,
                    y: args.y
                }
            });
        },
        createUser: async (parent:any, args: { id: string, name: string, email: string }, context: Context) => {
            return await context.prisma.user.create({
                data: {
                    id: args.id,
                    name: args.name,
                    email: args.email
                }
            });
        }
    }
};

export default resolvers;

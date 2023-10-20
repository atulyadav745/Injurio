import { Context } from '@/pages/api/graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// interface CreateInjuryReportInput {
//     userId: string;
//     datetime: Date;
//     name: string;
//     injuries: CreateInjuryDetailInput[];
//   }
  
//   interface CreateInjuryDetailInput {
//     injuryDescription: string;
//     x: number;
//     y: number;
//   }

export const resolvers = {
    Query:{
        injuryReports:async(parent:any, args: any, context: Context)=>{
            return await context.prisma.injuryReport.findMany();
        },
    },
//   Mutation: {
//     createInjuryReport: async (_: any, { input }: {input:CreateInjuryReportInput}) => {
//       const { userId, datetime, name, injuries } = input;
//       const createdReport = await prisma.injuryReport.create({
//         data: {
//           userId,
//           datetime,
//           name,
//           injuries: {
//             createMany: {
//               data: injuries,
//             },
//           },
//         },
//         include: {
//           injuries: true,
//           user: true,
//         },
//       });
//       return createdReport;
//     },
//     updateInjuryReport: async (_: any, { id, input }: { id: number, input: CreateInjuryReportInput }) => {
//       const { userId, datetime, name, injuries } = input;
//       const updatedReport = await prisma.injuryReport.update({
//         where: {
//           id: id,
//         },
//         data: {
//           userId,
//           datetime,
//           name,
//           injuries: {
//             deleteMany: {},
//             createMany: {
//               data: injuries,
//             },
//           },
//         },
//         include: {
//           injuries: true,
//           user: true,
//         },
//       });
//       return updatedReport;
//     },
//     deleteInjuryReport: async (_: any, { id }: { id: number }) => {
//       const deletedReport = await prisma.injuryReport.delete({
//         where: {
//           id: id,
//         },
//         include: {
//           injuries: true,
//           user: true,
//         },
//       });
//       return deletedReport;
//     },
//   },
};

export default resolvers;

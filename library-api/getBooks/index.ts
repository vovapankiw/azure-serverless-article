import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { CosmosClient } = require("@azure/cosmos");

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.DB_ENDPOINT;
const key = process.env.DB_SECRET;
const databaseName = process.env.DB_NAME;
const collectionName = process.env.DB_COLLECTION;

const client = new CosmosClient({ endpoint, key });

const getBooks: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('getBooks function processed a request.');

    const query = {
			query: "SELECT * FROM root OFFSET @offset LIMIT @limit",
			parameters: [
				{
					name: "@offset",
					value: parseInt(req.query.offset, 10)
				},
				{
					name: '@limit',
					value: parseInt(req.query.limit, 10)
				}
			]
		}

    try {
        const {resources: items} = await client
            .database(databaseName)
            .container(collectionName)
            .items
            .query(query)
            .fetchAll();

        context.res = {
            status: 200,
            body: {
                data: items,
                previousPage: parseInt(req.query.offset, 10),
                nextPage: parseInt(req.query.offset, 10) + parseInt(req.query.limit, 10)
            }
        };
    } catch (e) {
        context.log(e);
        context.res = {
            status: e.statusCode,
            body: 'Error ' + e.message
        };
    }

};

export default getBooks;
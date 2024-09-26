import { Liquibase, LiquibaseConfig } from 'liquibase';
import * as dotenv from 'dotenv';

dotenv.config();

const myConfig: LiquibaseConfig = {
  changeLogFile: process.env.LIQUIBASE_CHANGELOG_FILE || './changelog.xml',
  url: process.env.LIQUIBASE_URL || 'jdbc:postgresql://localhost:5432/node_liquibase_testing',
  username: process.env.LIQUIBASE_USERNAME || 'yourusername',
  password: process.env.LIQUIBASE_PASSWORD || 'yoursecurepassword',
};

const instance = new Liquibase(myConfig);

async function doEet() {
  await instance.status();
  // await instance.update();
  // await instance.dropAll();
}

doEet();
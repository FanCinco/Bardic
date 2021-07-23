const router = require('express').Router();
const sequelize = require('../config/connection');
const { Places, Story, Expenses, Users, Vote } = require('../models');


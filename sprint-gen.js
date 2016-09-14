#!/usr/bin/env node

'use strict';

var program = require('commander');
var _ = require('lodash');
_.mixin(require('underscore.string'));
var util = require('util');
var path = require('path');
var fs = require('fs');

var adjectives = require(__dirname + '/lib/adjectives.json');

var animals = {
    'birds': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/birds.json'), 'utf8'),
    'fish': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/fish.json'), 'utf8'),
    'lizards': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/lizards.json'), 'utf8'),
    'reptiles': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/reptiles.json'), 'utf8'),
    'mammals': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/mammals.json'), 'utf8'),
    'misc': JSON.parse(fs.readFileSync(__dirname + '/lib/animals/misc.json'), 'utf8')
};

var format = function(data) {
    data = _.map(data, function(row) {
        return _.capitalize(row.toLowerCase());
    });
    return data;
};

adjectives = format(adjectives);
_.each(animals, function(data, key) {
    animals[key] = format(data);
});

var generateName = function(number, categories, previousNames) {
	var category = _.shuffle(categories)[0];

    var chr = String.fromCharCode(64 + number);
    var filteredAdjectives = _.filter(adjectives, function(adjective) {
        if (adjective[0] === chr) {
            return true;
        }
    })

    adjectives = _.shuffle(filteredAdjectives);
    var adjective = adjectives[0];
    var filteredAnimals = _.filter(animals[category], function(animal) {
        if (animal[0] === adjective[0]) {
            return true;
        }
    });

    if (!filteredAnimals.length) {
        return generateName(number, categories, previousNames);
    }

    filteredAnimals = _.shuffle(filteredAnimals);

    var name = adjective + ' ' + filteredAnimals[0];
    if (previousNames.indexOf(name) >= 0) {
        return generateName(number, category, previousNames);
    }
    return name;
};

var go = function(sprint, number, slack) {
	var names = []

	for (var i = 0; i < number; i++) {
    	names.push(generateName(sprint, _.keys(animals), names));
    }

    if (slack) {
    	var output = '/poll "Codename for Sprint ' + sprint + '"'
    	for (var i = 0; i < names.length; i++) {
    		output += (' "' + names[i] + '"')
    	}
    	console.log(output)
    } else {
    	for (var i = 0; i < names.length; i++) {
    		console.log(names[i])
    	}
    }

};

program
	.arguments('<sprint_number>')
	.option('-n, --number <n>', 'number of names to generate', parseInt)
	.option('-s, --slack', 'format output for use with Slack Simple Poll')
	.action(function(sprint_number) {
		go(parseInt(sprint_number), program.number, program.slack);
	})
	.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp()
}



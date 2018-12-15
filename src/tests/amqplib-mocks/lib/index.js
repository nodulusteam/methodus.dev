"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Connection = require("./connection");

let connections = {};

module.exports = {
	connections,
	getConnection(url) {
		return connections[url];
	},
	connect(url) {
		return _asyncToGenerator(function* () {
			if (connections[url]) {
				throw new Error(`A connection is already open to ${url}`);
			}
			const connection = new Connection();
			connections[url] = connection;
			return connection;
		})();
	},
	reset: () => {
		connections = {};
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25uZWN0aW9uIiwicmVxdWlyZSIsImNvbm5lY3Rpb25zIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldENvbm5lY3Rpb24iLCJ1cmwiLCJjb25uZWN0IiwiRXJyb3IiLCJjb25uZWN0aW9uIiwicmVzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxhQUFhQyxRQUFTLGNBQVQsQ0FBbkI7O0FBRUEsSUFBSUMsY0FBYyxFQUFsQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNoQkYsWUFEZ0I7QUFFaEJHLGVBQWVDLEdBQWYsRUFBcUI7QUFDcEIsU0FBT0osWUFBYUksR0FBYixDQUFQO0FBQ0EsRUFKZTtBQUtWQyxRQUFOLENBQWVELEdBQWYsRUFBcUI7QUFBQTtBQUNwQixPQUFLSixZQUFhSSxHQUFiLENBQUwsRUFBMEI7QUFDekIsVUFBTSxJQUFJRSxLQUFKLENBQVksbUNBQW1DRixHQUFLLEVBQXBELENBQU47QUFDQTtBQUNELFNBQU1HLGFBQWEsSUFBSVQsVUFBSixFQUFuQjtBQUNBRSxlQUFhSSxHQUFiLElBQXFCRyxVQUFyQjtBQUNBLFVBQU9BLFVBQVA7QUFOb0I7QUFPcEIsRUFaZTtBQWFoQkMsUUFBTyxNQUFNO0FBQ1pSLGdCQUFjLEVBQWQ7QUFDQTtBQWZlLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29ubmVjdGlvbiA9IHJlcXVpcmUoIFwiLi9jb25uZWN0aW9uXCIgKTtcblxubGV0IGNvbm5lY3Rpb25zID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjb25uZWN0aW9ucyxcblx0Z2V0Q29ubmVjdGlvbiggdXJsICkge1xuXHRcdHJldHVybiBjb25uZWN0aW9uc1sgdXJsIF07XG5cdH0sXG5cdGFzeW5jIGNvbm5lY3QoIHVybCApIHtcblx0XHRpZiAoIGNvbm5lY3Rpb25zWyB1cmwgXSApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvciggYEEgY29ubmVjdGlvbiBpcyBhbHJlYWR5IG9wZW4gdG8gJHsgdXJsIH1gICk7XG5cdFx0fVxuXHRcdGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbigpO1xuXHRcdGNvbm5lY3Rpb25zWyB1cmwgXSA9IGNvbm5lY3Rpb247XG5cdFx0cmV0dXJuIGNvbm5lY3Rpb247XG5cdH0sXG5cdHJlc2V0OiAoKSA9PiB7XG5cdFx0Y29ubmVjdGlvbnMgPSB7fTtcblx0fVxufTtcbiJdfQ==
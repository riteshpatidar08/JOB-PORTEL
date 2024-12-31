import React from 'react'

function Filteration() {
  return (
    <div>
        <div className="w-1/4 p-4 bg-dark-gray-1 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>

          <input
            type="text"
            placeholder="Search by job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 bg-input-field rounded-lg mb-4 text-white"
          />

          <div>
            <h3 className="text-white mb-2">Salary Range</h3>
            <Group direction="column" spacing={5}>
              <Checkbox
                label="0-3 Lakhs"
                value="0-3"
                onChange={() => handleSalaryRangeChange('0-3')}
                checked={salaryRange.includes('0-3')}
                className="text-white"
              />
              <Checkbox
                label="3-5 Lakhs"
                value="3-5"
                onChange={() => handleSalaryRangeChange('3-5')}
                checked={salaryRange.includes('3-5')}
                className="text-white"
              />
              <Checkbox
                label="5-10 Lakhs"
                value="5-10"
                onChange={() => handleSalaryRangeChange('5-10')}
                checked={salaryRange.includes('5-10')}
                className="text-white"
              />
              <Checkbox
                label="10-15 Lakhs"
                value="10-15"
                onChange={() => handleSalaryRangeChange('10-15')}
                checked={salaryRange.includes('10-15')}
                className="text-white"
              />
            </Group>
          </div>

          <div>
            <h3 className="text-white mb-2">Role</h3>
            <Group direction="column" spacing={5}>
              <Checkbox
                label="React Developer"
                value="React"
                onChange={() => handleRoleChange('React')}
                checked={roles.includes('React')}
                className="text-white"
              />
              <Checkbox
                label="MERN Stack Developer"
                value="MERN"
                onChange={() => handleRoleChange('MERN')}
                checked={roles.includes('MERN')}
                className="text-white"
              />
              <Checkbox
                label="Node.js Developer"
                value="Node.js"
                onChange={() => handleRoleChange('Node.js')}
                checked={roles.includes('Node.js')}
                className="text-white"
              />
              <Checkbox
                label="JavaScript Developer"
                value="JavaScript"
                onChange={() => handleRoleChange('JavaScript')}
                checked={roles.includes('JavaScript')}
                className="text-white"
              />
            </Group>
          </div>
        </div>
    </div>
  )
}

export default Filteration

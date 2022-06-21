module.exports = {
  complianceUri:
    process.env.NEXT_COMPLIANCE_URI ||
    'http://localhost:3000' ||
    'https://compliance.gaia-x.eu/api/v1'
}

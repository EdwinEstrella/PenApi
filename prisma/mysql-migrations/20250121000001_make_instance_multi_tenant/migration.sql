-- Remove global unique constraint on Instance.name
-- Instance names should be unique per user, not globally
DROP INDEX IF EXISTS `Instance_name_key`;

-- Add index for better query performance (not unique)
CREATE INDEX `Instance_name_idx` ON `Instance`(`name`);

-- Add index on UserInstance for better join performance
CREATE INDEX `UserInstance_userId_idx` ON `UserInstance`(`userId`);
CREATE INDEX `UserInstance_instanceId_idx` ON `UserInstance`(`instanceId`);


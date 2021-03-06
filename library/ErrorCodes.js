"use strict"

const CUSTOM_ERRNO = {
    NO_CLIENT_REQUEST   : 1500,
    ECINVAL             : 1501,
    FAILED_ID_UPDATE    : 1502,
    FAILED_QUERY_UPDATE : 1503,
    FAILED_ID_REMOVE    : 1504,
    FAILED_QUERY_REMOVE : 1505,
    MISSING_KEYS        : 1506,
    NO_USER             : 1507,
    EPERM               : 1508,
    BAD_WEB_TOKEN       : 1509,
    ENOT_AVAILABLE      : 1510,
    ENO_PLAY            : 1511,
    ESINVAL             : 1550
};

var ERRNO = {

    /* Custom Errors Added By Developer */
    /*********************************/
    1500 : "MissingClientInput",
    1501 : "InvalidClientInput",
    1502 : "ID_Miss_OnUpdate -> NoModifiableDocument",
    1503 : "Query_Miss_OnUpdate -> NoModifiableDocument",
    1504 : "ID_Miss_OnRemove -> NoRemovableDocument",
    1505 : "Query_Miss_OnRemove -> NoRemovableDocument",
    1506 : "MissingSchemaKeyValues",
    1507 : "UserNotPresent",
    1508 : "ValidationError",
    1509 : "JSON_WebToken_Malformed",
    1510 : "ResourceUnAvalilable -> Checkout limit reached",
    1511 : "PlayNotPresent",
    1550 : "InvalidServerArguments",
    /*********************************/

    0 : "OK",
    1 : "InternalError",
    2 : "BadValue",
    3 : "OBSOLETE_DuplicateKey",
    4 : "NoSuchKey",
    5 : "GraphContainsCycle",
    6 : "HostUnreachable",
    7 : "HostNotFound",
    8 : "UnknownError",
    9 : "FailedToParse",
    10 : "CannotMutateObject",
    11 : "UserNotFound",
    12 : "UnsupportedFormat",
    13 : "Unauthorized",
    14 : "TypeMismatch",
    15 : "Overflow",
    16 : "InvalidLength",
    17 : "ProtocolError",
    18 : "AuthenticationFailed",
    19 : "CannotReuseObject",
    20 : "IllegalOperation",
    21 : "EmptyArrayOperation",
    22 : "InvalidBSON",
    23 : "AlreadyInitialized",
    24 : "LockTimeout",
    25 : "RemoteValidationError",
    26 : "NamespaceNotFound",
    27 : "IndexNotFound",
    28 : "PathNotViable",
    29 : "NonExistentPath",
    30 : "InvalidPath",
    31 : "RoleNotFound",
    32 : "RolesNotRelated",
    33 : "PrivilegeNotFound",
    34 : "CannotBackfillArray",
    35 : "UserModificationFailed",
    36 : "RemoteChangeDetected",
    37 : "FileRenameFailed",
    38 : "FileNotOpen",
    39 : "FileStreamFailed",
    40 : "ConflictingUpdateOperators",
    41 : "FileAlreadyOpen",
    42 : "LogWriteFailed",
    43 : "CursorNotFound",
    45 : "UserDataInconsistent",
    46 : "LockBusy",
    47 : "NoMatchingDocument",
    48 : "NamespaceExists",
    49 : "InvalidRoleModification",
    50 : "ExceededTimeLimit",
    51 : "ManualInterventionRequired",
    52 : "DollarPrefixedFieldName",
    53 : "InvalidIdField",
    54 : "NotSingleValueField",
    55 : "InvalidDBRef",
    56 : "EmptyFieldName",
    57 : "DottedFieldName",
    58 : "RoleModificationFailed",
    59 : "CommandNotFound",
    60 : "OBSOLETE_DatabaseNotFound",
    61 : "ShardKeyNotFound",
    62 : "OplogOperationUnsupported",
    63 : "StaleShardVersion",
    64 : "WriteConcernFailed",
    65 : "MultipleErrorsOccurred",
    66 : "ImmutableField",
    67 : "CannotCreateIndex",
    68 : "IndexAlreadyExists",
    69 : "AuthSchemaIncompatible",
    70 : "ShardNotFound",
    71 : "ReplicaSetNotFound",
    72 : "InvalidOptions",
    73 : "InvalidNamespace",
    74 : "NodeNotFound",
    75 : "WriteConcernLegacyOK",
    76 : "NoReplicationEnabled",
    77 : "OperationIncomplete",
    78 : "CommandResultSchemaViolation",
    79 : "UnknownReplWriteConcern",
    80 : "RoleDataInconsistent",
    81 : "NoMatchParseContext",
    82 : "NoProgressMade",
    83 : "RemoteResultsUnavailable",
    84 : "DuplicateKeyValue",
    85 : "IndexOptionsConflict",
    86 : "IndexKeySpecsConflict",
    87 : "CannotSplit",
    88 : "SplitFailed_OBSOLETE",
    89 : "NetworkTimeout",
    90 : "CallbackCanceled",
    91 : "ShutdownInProgress",
    92 : "SecondaryAheadOfPrimary",
    93 : "InvalidReplicaSetConfig",
    94 : "NotYetInitialized",
    95 : "NotSecondary",
    96 : "OperationFailed",
    97 : "NoProjectionFound",
    98 : "DBPathInUse",
    100 : "CannotSatisfyWriteConcern",
    101 : "OutdatedClient",
    102 : "IncompatibleAuditMetadata",
    103 : "NewReplicaSetConfigurationIncompatible",
    104 : "NodeNotElectable",
    105 : "IncompatibleShardingMetadata",
    106 : "DistributedClockSkewed",
    107 : "LockFailed",
    108 : "InconsistentReplicaSetNames",
    109 : "ConfigurationInProgress",
    110 : "CannotInitializeNodeWithData",
    111 : "NotExactValueField",
    112 : "WriteConflict",
    113 : "InitialSyncFailure",
    114 : "InitialSyncOplogSourceMissing",
    115 : "CommandNotSupported",
    116 : "DocTooLargeForCapped",
    117 : "ConflictingOperationInProgress",
    118 : "NamespaceNotSharded",
    119 : "InvalidSyncSource",
    120 : "OplogStartMissing",
    121 : "DocumentValidationFailure",
    122 : "OBSOLETE_ReadAfterOptimeTimeout",
    123 : "NotAReplicaSet",
    124 : "IncompatibleElectionProtocol",
    125 : "CommandFailed",
    126 : "RPCProtocolNegotiationFailed",
    127 : "UnrecoverableRollbackError",
    128 : "LockNotFound",
    129 : "LockStateChangeFailed",
    130 : "SymbolNotFound",
    131 : "RLPInitializationFailed",
    132 : "ConfigServersInconsistent",
    133 : "FailedToSatisfyReadPreference",
    134 : "ReadConcernMajorityNotAvailableYet",
    135 : "StaleTerm",
    136 : "CappedPositionLost",
    137 : "IncompatibleShardingConfigVersion",
    138 : "RemoteOplogStale",
    139 : "JSInterpreterFailure",
    140 : "InvalidSSLConfiguration",
    141 : "SSLHandshakeFailed",
    142 : "JSUncatchableError",
    143 : "CursorInUse",
    144 : "IncompatibleCatalogManager",
    145 : "PooledConnectionsDropped",
    146 : "ExceededMemoryLimit",
    147 : "ZLibError",
    148 : "ReadConcernMajorityNotEnabled",
    149 : "NoConfigMaster",
    150 : "StaleEpoch",
    151 : "OperationCannotBeBatched",
    152 : "OplogOutOfOrder",
    153 : "ChunkTooBig",
    154 : "InconsistentShardIdentity",
    155 : "CannotApplyOplogWhilePrimary",
    156 : "NeedsDocumentMove",
    157 : "CanRepairToDowngrade",
    158 : "MustUpgrade",
    159 : "DurationOverflow",
    160 : "MaxStalenessOutOfRange",
    161 : "IncompatibleCollationVersion",
    161 : "IncompatibleCollationVersion",
    161 : "IncompatibleCollationVersion",
    9001 : "SocketException",
    9996 : "RecvStaleConfig",
    10107 : "NotMaster",
    10003 : "CannotGrowDocumentInCappedNamespace",
    11000 : "DuplicateKey",
    11600 : "InterruptedAtShutdown",
    11601 : "Interrupted",
    11602 : "InterruptedDueToReplStateChange",
    14031 : "OutOfDiskSpace",
    17280 : "KeyTooLong",
    12586 : "BackgroundOperationInProgressForDatabase",
    12587 : "BackgroundOperationInProgressForNamespace",
    13436 : "NotMasterOrSecondary",
    13435 : "NotMasterNoSlaveOk",
    13334 : "ShardKeyTooBig",
    13388 : "SendStaleConfig",
    13297 : "DatabaseDifferCase",
    13104 : "OBSOLETE_PrepareConfigsFailed",
    13104 : "OBSOLETE_PrepareConfigsFailed",
    13104 : "OBSOLETE_PrepareConfigsFailed"
};

module.exports = {
    ERRNO : ERRNO,
    CUSTOM_ERRNO : CUSTOM_ERRNO
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

// Gestiona los recursos.
contract ResourceList {
   
    struct Resource {
        address publisher;
        bytes32 title;
        string filehash; // content addressable identifier.
        string description; // content description identifier.
        uint256 timestamp; // date added
        ResourceList.Licenses license;
        string remixOf; // remix hash
    }

    enum Licenses {
        Attribution,
        Attribution_No_Derivative_Works,
        Attribution_Share_Alike,
        Attribution_Non_Commercial,
        Attribution_Non_Commercial_Share_Alike,
        Attribution_Non_Commercial_No_Derivatives,
        Public_Domain
    }

    // Uso es utilizar tal cual el recurso, reuso es cambiar la intencion que le pretendes dar
    enum Usages {
        teaching,
        self_learning,
        assesment,
        course_preparation,
        lecture_class
    }

    // uint256 public constant maxAmountOfVotes = 1000;

    mapping(string => Resource) public resources;

    // mapping(string => address) public votes;

    string[] public resourceIndex;

    // Resource Management
    event ResourceAdded(address indexed publisher , string indexed filehash, uint256 timestamp);

    // Resource Tracking
    event ResourceUsed(
        string indexed resource,
        address user,
        Usages usage,
        string comment,
        uint256 timestamp
    );

    event ResourceAdapted( // Falta el tiempo
        string indexed resource,
        address user,
        string remix,
        string comment,
        uint256 timestamp
    );

    function addResource(
        bytes32 _title,
        string memory _filehash,
        string memory _description,
        Licenses _license,
        string memory _remixOf,
        string memory remixComment
    ) public returns (bool success) {
        Resource memory newResource =
            Resource(
                msg.sender,
                _title,
                _filehash,
                _description,
                block.timestamp,
                _license,
                _remixOf
            );
        resources[_filehash] = newResource;
        resourceIndex.push(_filehash);

        emit ResourceAdded(msg.sender, _filehash, block.timestamp);

        if (bytes(_remixOf).length != 0) {
            // Check if original file exists.
            require(
                !(resources[_remixOf].title == 0x0),
                "Remix file doesn't exist."
            );
            emit ResourceAdapted(_remixOf, msg.sender, _filehash, remixComment, block.timestamp);
        }
        return true;
    }

    function registerUsage(string memory _resource, Usages  _usage, string memory _comment )
        external
        returns (bool success)
    {
        emit ResourceUsed(_resource, msg.sender, _usage, _comment,block.timestamp);
        return true;
    }

    function getResourcesCount() public view returns (uint256 count) {
        return resourceIndex.length;
    }
}
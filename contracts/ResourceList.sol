// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract ResourceList{
   // Representa el REA
    struct Resource {
        address provider;
        bytes32 title;
        bytes32 author;
        string filehash; 
        string descriptionhash; 
        uint256 timestamp; 
        ResourceList.Licenses license;
        string remixOf;
    }
    // Enumera las licencias CC.
    enum Licenses {
        Attribution,
        AttributionNoDerivativeWorks,
        AttributionShareAlike,
        AttributionNonCommercial,
        AttributionNonCommercialShareAlike,
        AttributionNonCommercialNoDerivatives,
        PublicDomain
    }
    // Enumera los usos.
    enum Usages {
        Teaching,
        SelfLearning,
        Assesment,
        CoursePreparation,
        LectureClass
    }

    // Enumera las adaptaciones.
    enum Adaptation {
        Remix,
        Correction,
        DerivedCopy,
        Translation
    }
    // mapping to store Resources.
    mapping(string => Resource) public resources;

    // array used for knowing resourceIndex.
    string[] public resourceIndex;

    // Modifiers
    modifier resourceExists (string memory filehash){
      require(!(resources[filehash].title == 0x0), "Resource doesn't exist");
      _;
   }

    // Events
    // Register Resource Usage Log
    event ResourceUsed(
        string indexed resource,
        address consumer,
        Usages usage,
        string comment,
        uint256 timestamp
    );

    // Register Resource Adaptation Log
    event ResourceAdapted( 
        string indexed resource,
        address consumer,
        string adaptatedResource,
        string comment,
        Adaptation adaptation,
        uint256 timestamp
    );

    // Add Resource
    function addResource(
        bytes32 _title,
        bytes32 _author,
        string memory _filehash,
        string memory _descriptionhash,
        Licenses _license
    ) public returns (bool success) {
        Resource memory newResource =
            Resource(
                msg.sender,
                _title,
                _author,
                _filehash,
                _descriptionhash,
                block.timestamp,
                _license,
                ""
            );
        resources[_filehash] = newResource;
        resourceIndex.push(_filehash);
        return true;
    }

    // Add Resource Adaptation
   function addAdaptation(
        bytes32 _title,
        bytes32 _author,
        string memory _filehash,
        string memory _descriptionhash,
        Licenses _license,
        Adaptation _adaptation,
        string memory _remixOf,
        string memory _comment
    ) public 
    resourceExists(_remixOf)
    returns (bool success) {
        Resource memory newResource =
            Resource(
                msg.sender,
                _title,
                _author,
                _filehash,
                _descriptionhash,
                block.timestamp,
                _license,
                _remixOf
            );
        resources[_filehash] = newResource;
        resourceIndex.push(_filehash);
        
        emit ResourceAdapted(_remixOf, msg.sender, _filehash, _comment,_adaptation, block.timestamp);
    }

    function registerUsage(string memory _resource, Usages  _usage, string memory _comment )
        external
        resourceExists(_resource)
        returns (bool success)
    {
        emit ResourceUsed(_resource, msg.sender, _usage, _comment,block.timestamp);
        return true;
    }

    function getResourcesCount() public view returns (uint256 count) {
        return resourceIndex.length;
    }
}
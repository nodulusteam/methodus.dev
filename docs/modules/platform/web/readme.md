This is a client library for the Methodus framework, but it can also be used independently.

# Methodus Client
![Quality gate](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=alert_status "Quality gate")
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=vulnerabilities "coverage")


# Usage
The library is used to define transport related integrations using TypeScript decorators. The decorated classes will be used to invoke the transport and deliver the call using it. For example a website using Rest calls to a remote server will abstract the Rest calls to a decorated class and then use that class instead of direct Rest access code.

Decorated client contract classes can be created manually or auto generated using the [@methodus/contracts](https://github.com/nodulusteam/tools/methodus-contracts) package.


<!-- tabs:start -->
#### ** Reference **

[filename](index.html ':include')
 
#### ** Tests overview **

[tests](test_dashboard.html ':include :type=iframe width=100% height=100%')



<!-- tabs:end -->





